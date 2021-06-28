import React from "react";
import { Route, Switch, Redirect, withRouter, } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";
// import Header from "./../Header/Header";
import Sidebar from "./../Sidebar/Sidebar";

// pages
import Dashboard from "./../../pages/dashboard/Dashboard";
import Typography from "./../../pages/typography/Typography";
import Notifications from "./../../pages/notifications/Notifications";
import Maps from "./../../pages/maps/Maps";
import Tables from "./../../pages/tables/Tables";
import Icons from "./../../pages/icons/Icons";
import Charts from "./../../pages/charts/Charts";
import ProfileRightBar from "./../ProfileRightBar";
import Semester from './../../pages/semester/Semester';
import DisciplineLayout from './../discipline/DisciplineLayout';
import LabsTimeline from './../../pages/LabsTimeline/index';

function Layout(props) {
  var classes = useStyles();
  return (<>
    <div className={classes.root}>
      {/* <Header history={props.history} /> */}
      <Sidebar history={props.history} />
      <div className={classnames(classes.content)}>
        <Switch>
          {/* <Route exact path="/app" component={Dashboard} />
          <Route path="/app/typography" component={Typography} />
          <Route path="/app/tables" component={Tables} />
          <Route path="/app/notifications" component={Notifications} />
          <Route exact path="/app/ui" render={() => <Redirect to="/app/ui/icons" />}/>
          <Route path="/app/ui/maps" component={Maps} />
          <Route path="/app/ui/icons" component={Icons} />
          <Route path="/app/ui/charts" component={Charts} /> */}
          <Route exact path="/app/" render={() => <Redirect to="/app/timeline" />}/>
          <Route exact path="/app/timeline/" component={LabsTimeline} />
          <Route exact path="/app/semester/" component={Semester} />
          <Route exact path="/app/semester/:semester_num" component={Semester} />
          <Route exact path="/app/semester/:semester_num/discipline/:id_discipline"
              render={(props) => <Redirect to={'./' + props.match.params.id_discipline + "/labs"} />} />
          <Route path="/app/semester/:semester_num/discipline/:id_discipline/:tab" component={DisciplineLayout} />
        </Switch>
      </div>
      <ProfileRightBar />
    </div>
  </>);
}

export default withRouter(Layout);
