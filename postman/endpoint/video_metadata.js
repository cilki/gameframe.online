/*
 * Postman test for the ARTICLE_METADATA query
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
  pm.expect(json.video_id).to.eql(parseInt(pm.variables.get("video_id")));
  pm.expect(json.name).to.not.be.null;
  pm.expect(json.channel).to.not.be.null;
  pm.expect(json.description).to.not.be.null;
  pm.expect(json.timestamp).to.not.be.null;
  pm.expect(json.thumbnail).to.not.be.null;
  pm.expect(json.video_link).to.not.be.null;
  pm.expect(json.games).to.not.be.null;
});
