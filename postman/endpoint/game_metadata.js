/*
 * Postman test for the GAME_METADATA query
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
  pm.expect(json.game_id).to.eql(parseInt(pm.variables.get("game_id")));
  pm.expect(json.name).to.not.be.null;
  pm.expect(json.release).to.not.be.null;
  pm.expect(json.cover).to.not.be.null;
  pm.expect(json.screenshots).to.not.be.null;
  pm.expect(json.summary).to.not.be.null;
  pm.expect(json.genres).to.not.be.null;
  pm.expect(json.platforms).to.not.be.null;
  pm.expect(json.articles).to.not.be.null;
  pm.expect(json.developers).to.not.be.null;
});

pm.test("Response Links", function() {
  var json = pm.response.json();
  pm.expect(json.articles.length).to.be.above(0);
  pm.expect(json.developers.length).to.be.above(0);
});
