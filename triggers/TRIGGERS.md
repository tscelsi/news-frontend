This is a directory with mongodb triggers that reset the number of scrapes a user has triggered per-day to 0.
We limit the number of scrapes they can trigger to 1.

Here we also track what other mongodb configurations we have, like expiring documents, etc:

