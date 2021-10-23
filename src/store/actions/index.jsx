import { pageChangeHeaderTitle, pageChangeTheme, pageShowAlert} from "./pageAction";
import { sidemenuToggle, sidemenuChange } from "./sidemenuAction";
import { breadcrumbChange } from "./breadcrumbAction";
import { firebaseChange } from "./firebaseAction";
import { activityChange } from "./activityAction";
import { userChange } from "./userAction";
import { loadPathway, loadRunner, cleanRunner, cleanPathway, getPathwayBy, getRunnerBy } from "./pathwayAction";
import { asideToggle, asideChange } from "./asideAction"


// Export all actions
export {
  pageChangeHeaderTitle,
  pageChangeTheme,
  sidemenuToggle,
  sidemenuChange,
  firebaseChange,
  activityChange,
  breadcrumbChange,
  userChange,
  loadPathway,
  loadRunner,
  asideToggle,
  asideChange,
  getPathwayBy,
  getRunnerBy,
  cleanPathway,
  cleanRunner,
  pageShowAlert
};
