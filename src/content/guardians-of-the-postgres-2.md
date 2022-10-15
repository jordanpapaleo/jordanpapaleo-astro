---
date: 2020-04-29T00:07:27.264Z
title: Guardians of the Postgres, The Search for Postgres, The Never Ending Postgres Part 2
tags: Postgres, Node, Learning, Weird
type: exploration
---

# Day 2

Captains Log: I accidentally came across the answer to my questions yesterday will investigating the daily catastrophe: `Error: role "postgres" does not exist` That sounds serious.  I must have pissed off a local deity or something. .. While debugging the that error I came across this:

```bash
$ psql -l # lists out all of the databases
```

It actually list all of the databases on my server.  HA! And I was not even trying to do find that.  Let’s make sure we can accomplish the create and delete tasks from above.  Apparently I have a few databases…

```bash
     Name      |     Owner     | Encoding | Collate | Ctype |
---------------+---------------+----------+---------+-------+
 jordan        | jordanpapaleo | UTF8     | C       | C     |
 jordanpapaleo | jordanpapaleo | UTF8     | C       | C     |
 postgres      | jordanpapaleo | UTF8     | C       | C     |
 template0     | jordanpapaleo | UTF8     | C       | C     |
 template1     | jordanpapaleo | UTF8     | C       | C     |
 tester        | jordanpapaleo | UTF8     | C       | C     |
```


```bash
$ dropdb jordan
$ dropdb tester
```

Worked perfect!

```bash
     Name      |     Owner     | Encoding | Collate | Ctype |
---------------+---------------+----------+---------+-------+
 jordanpapaleo | jordanpapaleo | UTF8     | C       | C     |
 postgres      | jordanpapaleo | UTF8     | C       | C     |
 template0     | jordanpapaleo | UTF8     | C       | C     |
 template1     | jordanpapaleo | UTF8     | C       | C     |

```

```bash
$ dropdb jordanpapaleo
```

Hmmm… did not work.

```bash
dropdb: database removal failed: ERROR:  database "jordanpapaleo" is being accessed by other users
DETAIL:  There is 1 other session using the database.
```

Who is using my database?  Maybe I was infiltrated but alien lifeforms and they have taken over this database (with nothing in it) to steal my plans.  Let the hunt for the infiltrator BEGIN!!!!

```bash
$ ps aux | grep psql
```

Oh… I have psql running somewhere.  Closed it.

```bash
$ dropdb jordanpapaleo
```

Yeah that worked this time.  Not nearly as exciting as a spy hunt or something.

> ProTip: When you are done using `psql` you should probably just quit the application to prevent false alarms about spies and stuff.

Ok real fast lets make a db and drop a db.  Make sure postgres is running. Im using `pgstart`

```bash
$ createdb jordan
$ psql -l
```

```bash
     Name      |     Owner     | Encoding | Collate | Ctype |
---------------+---------------+----------+---------+-------+
 jordan        | jordanpapaleo | UTF8     | C       | C     |
 postgres      | jordanpapaleo | UTF8     | C       | C     |
 template0     | jordanpapaleo | UTF8     | C       | C     |
 template1     | jordanpapaleo | UTF8     | C       | C     |
```

```bash
$ dropdb jordan
$ psql -l
```

```bash
     Name      |     Owner     | Encoding | Collate | Ctype |
---------------+---------------+----------+---------+-------+
 postgres      | jordanpapaleo | UTF8     | C       | C     |
 template0     | jordanpapaleo | UTF8     | C       | C     |
 template1     | jordanpapaleo | UTF8     | C       | C     |
```

This bring up one more question: Where did those databases come from and why another thing called postgres?  You’re killing me smalls.

- `postgres` :  supposedly the default database you connect to until you have other databases
- `template0`: skeleton database that gets used when creating a database
- `template1`: skeleton database that gets used when creating a database

Ready to move on!

## The error I just made by deleting my database
So I open `psql` and it gets all up in my face about the data base I just deleted not existing… whatevs.

`psql: FATAL: database "jordanpapaleo" does not exist`

Opening `psql` worked last time and I do not remember explicitly saying to open the `jordanpapaleo` database.  Ok so there are 2 options here:

1. Just re create the `jordanpapaleo` database and move on.
2. Figure out why psql keeps trying to open a database that does not exist.

The first one is the easy solution but easy is just not my type.   I will need to call in some `--help` here.

```bash
psql --help

# output
General options:
  -c, --command=COMMAND    run only single command (SQL or internal) and exit
  -d, --dbname=DBNAME      database name to connect to (default: "jordanpapaleo")
  -f, --file=FILENAME      execute commands from file, then exit
  -l, --list               list available databases, then exit
  -v, --set=, --variable=NAME=VALUE
```

Wait a tic! What the?  It appears that `jordanpapaleo` was a default database.  I wonder if there is some connection to my user name for my computer…  I did a little digging and it seems like the initial database connection becomes the default.

> ProTip: You can use your `~/.bashrc` or `~/.bash_profile` to set a default data base.  Just add the following line to your config file.
> `export PGDATABASE=whatevs`

For consistency we will just open psql with the name of a database.  Safer that way.

```bash
$ psql jordan
```

Dang, it’s getting dark.  Ok let’s camp here tonight and we will figure out the other error tomorrow.

## Links
- [Listing Databases and Tables in PostgreSQL Using psql](https://chartio.com/resources/tutorials/how-to-list-databases-and-tables-in-postgresql-using-psql/)

