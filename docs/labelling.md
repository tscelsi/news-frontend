We offer the ability to label articles that are either:

The same, similar or completely different.

Three labels:

SAME_EVENT, SAME_STORY, SAME_TOPIC, DIFFERENT

SAME_EVENT: outlines news articles that cover the exact same event. For example an article reporting the events of a migrant boat capsizing off the coast of italy.

SAME_STORY: Two news articles that cover the same story, but not necessarily the exact same event. E.g. an article
reporting the aftermath of a migrant boat capsizing off the coast of italy.

SAME_TOPIC: outlines news articles that cover the same topic, but not necessarily the same event. For example,
  migrant boats off the coast of italy.

DIFFERENT: covers articles that differ in topic and event. For example, an article about business and an article about polar bears.


We collect pairs of articles and labels representing the relationship between the two articles. We then use these pairs to train a model that can predict the label of a pair of articles.

The fingerprint should be a browser fingerprint, so that if a user is inputting bad labls, we can remove via this fingerprint. or just get user to log in lol

{
  article_one: 'some23lknlid',
  article_two: 'some23lknlid',
  label: 'SAME_EVENT',
  fingerprint: "somefingerprint", // TODO later
}