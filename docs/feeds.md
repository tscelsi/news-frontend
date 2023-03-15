A user logs in

A user can create a 'feed'
A 'feed' allows them to aggregate different sources of news into a coherent (to them) set of news articles. These can be organised into themes, i.e. a 'feed' on climate change & environment. Or it can be organised into outlet, country or many other factors.

It also allows us to classify articles into an arbitrary category, where in the data schema, each article belongs to one or many 'feeds'.

```prisma
Feed {
  id           String    @id @map("_id") @db.ObjectId
  name         String
  outlets      FeedOutlet[]
}
```

Each FeedOutlet belongs to one feed, and points to the outlet and section of the outlet that the news is collected from

```prisma
FeedOutlet {
  id           String    @id @map("_id") @db.ObjectId
  outlet       Outlet  // ID pointing to nytimes
  prefix         String  // /section/climate
}
```

An Outlet is a particular news outlet that news can be collected from. These are
relatively static objects, and are created by the admin.

```prisma
Outlet {
  id           String    @id @map("_id") @db.ObjectId
  name         String  // nytimes
}

{
  id: "23d23d23d23d23d23d23d23d",
  name: "nytimes"
}
```