import Record from "../controller/record"

module.exports = app => {
    app.route('/record/view').get(Record.view);
    app.route('/record/:values').post(Record.post);
}