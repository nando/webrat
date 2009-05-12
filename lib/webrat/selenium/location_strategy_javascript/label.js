var allLabels = inDocument.getElementsByTagName("label");
var candidateLabels = $A(allLabels).select(function(candidateLabel){
  var regExp = new RegExp('^' + locator + '\\b', 'i');
  var labelText = getText(candidateLabel).strip();
  return (labelText.search(regExp) >= 0);
});
if (candidateLabels.length == 0) {
  return null;
}
candidateLabels = candidateLabels.sortBy(function(s) { return s.length * -1; }); //reverse length sort
var locatedLabel = candidateLabels.first();
var labelFor = locatedLabel.getAttribute('for') || locatedLabel.getAttribute('htmlFor');
if((!labelFor || labelFor == "") && (locatedLabel.hasChildNodes())) {
  return locatedLabel.getElementsByTagName("input")[0];
}
return selenium.browserbot.locationStrategies['id'].call(this, labelFor, inDocument, inWindow);
