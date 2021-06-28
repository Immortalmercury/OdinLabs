import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  CardActions,
  CardContent,
  Card,
  CardActionArea,
  Divider,
} from "@material-ui/core";

// styles
import useStyles from "./styles"; 

import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import API from "../../services/API";
import LoadingPage from './../../components/Loading/index';

const getSemester = async (history) => {
  await API.call({
    method: "get_current_semester",
  }).then(result => {
    if (result.success) {
      console.log(result.data);
      if (result.data.semester)
      history.push('/app/semester/'+result.data.semester)
    }
  });
}

const getData = async (semester_num,setDisciplines,setLoading) => {
  await API.call({
    method: "disciplines_by_semester",
    semester: semester_num,
  }).then(result => {
    if (result.success) {
      console.log(result.data);
      setDisciplines(result.data);
    }
    setLoading(false);
  });
}

export default function Semester(props) {
  var classes = useStyles();
  const [disciplines, setDisciplines] = useState(null);
  const semester = props.match.params.semester_num;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (semester === undefined) {
      getSemester(props.history);
    } else {
      getData(semester, setDisciplines,setLoading);
    }
    return () => {
      setDisciplines(false);
      setLoading(true);
    };
  }, [semester,props.history]);

  return (
    <>
      {loading ? (<LoadingPage />) : (
        <>
          <PageTitle title="Дисциплины"/>
          <Grid container spacing={4}>
          {disciplines ? disciplines.map(item => (
              <Grid item lg={4} md={4} sm={6} xs={12} key={item.id_discipline}>
              <Card className={classes.root} style={{ height: "100%" }}>
                <CardActionArea className={classes.CardActionAreaRoot} onClick={() => {
                  props.history.push('/app/semester/'+semester+'/discipline/'+item.id_discipline+'/labs')
                }}>
                      <CardContent style={{width:'100%'}} className={classes.CardContent}>
                        <div>
                          <Typography color="textSecondary" variant="h6">
                            {item.description}
                          </Typography>
                          <Divider style={{ marginBottom: 20 }} />
                        </div>
                        <div>
                          <Typography className={classes.pos} color="textSecondary" >
                            Преподаватели
                          </Typography>
                          <Typography variant="caption"  color="textSecondary" component="p" >
                            {item.teachers.map(teacher => teacher.s_name+' '+teacher.s_name[0]+'.'+(teacher.fth_name!==null? teacher.fth_name[0]+'. ':' ')+' ')}
                          </Typography>
                        </div>
                      </CardContent>
                      <CardActions >
                        <Button color="primary" size="small" component={'div'} onClick={() => {
                          props.history.push('/app/semester/'+semester+'/discipline/'+item.id_discipline)
                        }}>
                              Перейти 
                        </Button>
                  </CardActions>
                  </CardActionArea>
                  
              </Card>
            </Grid>
          )) : (
            <Typography color="textSecondary" gutterBottom variant="h5">
            Ничего нет
          </Typography>
          )}
            

          </Grid>
        </>
      )}
    </>
  );
}
