/*
 * Postman test for the DEVELOPER_METADATA query
 * Copyright (C) 2018 GameFrame
 */

pm.test("HTTP Code", function() {
  pm.response.to.have.status(200);
});

pm.test("CORS Header", function() {
  pm.response.to.have.header("Access-Control-Allow-Origin");
});

pm.test("Response Time", function() {
  pm.expect(pm.response.responseTime).to.be.below(800);
});

pm.test("Response Content", function() {
  var json = pm.response.json();
  pm.expect(json.developer_id).to.eql(parseInt(pm.variables.get("developer_id")));
  pm.expect(json.name).to.not.be.null;
  pm.expect(json.country).to.not.be.null;
  pm.expect(json.logo).to.not.be.null;
  pm.expect(json.foundation).to.not.be.null;
  pm.expect(json.description).to.not.be.null;
  pm.expect(json.games).to.not.be.null;
  pm.expect(json.articles).to.not.be.null;
});

pm.test("Response Links", function() {
  var json = pm.response.json();
  pm.expect(json.games.length).to.be.above(0);
  pm.expect(json.articles.length).to.be.above(0);
});
