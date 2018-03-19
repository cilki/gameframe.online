/*
 * Postman test for the DEVELOPER_LIST query
 * Copyright (C) 2018 GameFrame
 */

pm.test("HTTP Code", function() {
  pm.response.to.have.status(200);
});

pm.test("CORS Header", function() {
  pm.response.to.have.header("Access-Control-Allow-Origin");
});

pm.test("Response Time", function() {
  pm.expect(pm.response.responseTime).to.be.below(1600);
});

pm.test("Response Content", function() {
  var json = pm.response.json();
  pm.expect(json.num_results).to.not.be.null;
  pm.expect(json.total_pages).to.not.be.null;
  pm.expect(json.page).to.eql(parseInt(pm.variables.get("page")));
  pm.expect(json.objects.length).to.eql(parseInt(pm.variables.get("results_per_page")));
});
