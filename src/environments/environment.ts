// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyCxIl_-ekPLkWFzzWmEHojW51g7l3WY7NM",
    authDomain: "awesome-foodmart.firebaseapp.com",
    databaseURL: "https://awesome-foodmart.firebaseio.com",
    projectId: "awesome-foodmart",
    storageBucket: "awesome-foodmart.appspot.com",
    messagingSenderId: "501984600810"
  }
};
