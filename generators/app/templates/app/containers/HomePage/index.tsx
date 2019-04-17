/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import { createStructuredSelector } from "reselect";

import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError
} from "containers/App/selectors";
import messages from "./messages";
import { loadRepos } from "../App/actions";
import { changeUsername } from "./actions";
import { makeSelectUsername } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { RootState } from "./types";

// Tslint:disable-next-line:no-empty-interface
interface OwnProps {}

interface StateProps {
  loading: boolean;
  error: object | boolean;
  repos: object[] | boolean;
  username: string;
}

interface DispatchProps {
  onChangeUsername(evt: any): void; // Not gonna declare event types here. No need. any is fine
  onSubmitForm(evt?: any): void; // Not gonna declare event types here. No need. any is fine
}

type Props = StateProps & DispatchProps & OwnProps;

export class HomePage extends React.PureComponent<Props> {
  /**
   * When initial state username is not null, submit the form to load repos
   */
  public componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  public render() {
    return (
      <article>
        <Helmet titleTemplate="Home Page" defaultTitle="Home Page">
          <meta name="description" content="Home Page" />
        </Helmet>
        <div>
          <FormattedMessage {...messages.startProjectHeader} />
        </div>
      </article>
    );
  }
}

// Map Disptach to your DispatchProps
export function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
    }
  };
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer<OwnProps>({ key: "home", reducer: reducer });
const withSaga = injectSaga<OwnProps>({ key: "home", saga: saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
