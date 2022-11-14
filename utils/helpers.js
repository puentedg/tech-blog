module.exports = {
    format_date: () => {
      let dt = new Date();
      return `${dt.getFullYear()}/${dt.getMonth()}/${dt.getDate()} ${dt.toLocaleTimeString()}`;
    },
  
    equal: function (a, b) {
      if (a === b) {
        return true;
      }
      return false;
    },
};