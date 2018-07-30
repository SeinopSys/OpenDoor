import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import store from "./store";
import Routes from "./routes";
import * as AuthService from "./services/auth";
import i18next from "./i18n";

store.dispatch(AuthService.validateToken());

render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </I18nextProvider>,
  document.getElementById("app"),
);
