import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    marginTop: '5em'
  },
  toolbarRoleDiv: {
    flexGrow: 12
  },
  toolbar: {
    backgroundColor: '#013199',
    paddingLeft: 0
  },
  homePageText: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'unset'
  },
  logo: {
    cursor: 'pointer'
  },
  navigationLabel: {
    color: 'white',
    textDecoration: 'unset',
    marginLeft: '2em'
  },
  loginWindow: {
    boxShadow: '7px 7px 11px grey',
    width: '500px',
    margin: 'auto',
    padding: '40px',
    backgroundColor: 'gainsboro'
  },
  loginForm: {
    marginTop: '30px'
  },
  loginButton: {
    marginTop: '2em'
  },
  navigationRoleLabel: {
    color: 'white',
    textDecoration: 'unset',
    marginLeft: '3em'
  },
  table: {
    padding: '20px',
    width: '90%',
    margin: 'auto',
    boxShadow: '2px 4px 10px 6px grey',
    textAlign: 'center'
  },
  tableHeaders: {
    fontWeight: 'bold'
  },
  autocomplete: {
    backgroundColor: '#C0C0C0',
    borderRadius: '3px',
    margin: '8px 0 4px 0'
  },
  image: {
    maxHeight: '20em'
  }
}), { index: 1 });

export const LoadingCss = `
display: block;
text-align: center;
margin-top: 5%;
`