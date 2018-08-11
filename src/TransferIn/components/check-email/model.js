import sdk from 'domain-sdk';

export default class CheckEmailModel {

  params = {
    token: ''
  };

  error = false;
  data = null;

  query = async () => {
    const { checkMailToken } = sdk.services.management.transferIn;
    const rs = await checkMailToken(this.params, {
      showError: false,
      throwError: false
    });
    if (rs && rs.code == 200) {
      this.data = rs && rs.data;
      this.error = false;
    } else {
      this.data = null;
      this.error = true;
    }
  }

}