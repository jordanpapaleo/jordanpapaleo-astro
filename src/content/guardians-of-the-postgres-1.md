---
date: 2020-04-28T00:07:27.264Z
title: Guardians of the Postgres, The Search for Postgres, The Never Ending Postgres Part 1
tags: Postgres, Node, Learning, Weird
type: exploration
---

# Day 1

Captains log…  @$&%. What does a title like the even mean?  How can this live up to those expectations?

I have been exploring the Postgres universe at the edges of the known reality for someone from FrontEnd. FrontEnd is a beautiful but dangerous world that feeds on bootcamp graduates.

I have learned that there is postgres and psql.  There is no way that I will be able to just write SQL queries from within what ever that tool there is so I spun up a little node app that use JavaScript string interpolation with a npm library to write statements.  More my style and it uses my JS theme which just makes me happy.

> ProTip: Postgres needs to be running before you can use it… maybe not a pro tip.  What’s the opposite of a pro tip?

Starting postgres can happen in many different ways.  I personally use `pgstart` in my terminal. I wrote a bash alias a while back to start the postgres for ruby back end for a project I work on.  You can add these to your `.bash_profile` then be able to forget about everything but `pgstart` and `pgstop`

```bash
# .bash_profile
alias pgstart="pg_ctl -D /usr/local/var/postgres start"
alias pgstop="pg_ctl -D /usr/local/var/postgres stop"
```

### Server started

Some how I can just write commands in my terminal.  I have no clue how.  It’s not `psql` ,  it’s something else.  It makes it really hard to search for info on this thing when I don’t know what it is…. Apparently vocab is important.  I think I will need to perform a recon mission to the surface of this strange world.

I encountered a native and was told that these commands I can run straight from the terminal are `postgresql`.  I think that is a one of this planet’s moons or something.  I asked more questions and was told that `postgres == postgresql`. They must not know that I am a JS developer.  But apparently the syntax used here is different than on the Front End.  The native gave me a list of commands I can use to communicate with this moon `postgresql`:

```bash
ls /usr/local/Cellar/postgresql/12.2/bin/
clusterdb         dropdb            initdb            pg_basebackup     pg_controldata    pg_dumpall        pg_recvlogical    pg_rewind         pg_test_timing    pgbench           psql              vacuumlo
createdb          dropuser          oid2name          pg_checksums      pg_ctl            pg_isready        pg_resetwal       pg_standby        pg_upgrade        postgres          reindexdb
createuser        ecpg              pg_archivecleanup pg_config         pg_dump           pg_receivewal     pg_restore        pg_test_fsync     pg_waldump        postmaster        vacuumdb
```

Another postgres local who also is fluent in this planets foreign tung just Slacked by me.  Big mistake for him.  After hours of interrogation, he explained that these commands are "shortcuts" made available via binaries giving access to do `SQL-ish` stuff without writing SQL commands.  This is making more sense now.  Before this, I just observed the ritual but did not know what was going on.  This seems easier so we will start here.

### Server started and then

Todo:
- [ ] Create DB
- [ ] Delete DB

Questions I have:
- Whats the difference between createdb and initdb?
	- createdb creates a databases in a server that is running and has a directory set to hold all the binary logs to hold the real data in the disk
	- initdb initializes the directory in which a server will be store all the binary logs to hold the real data in the disk
	- in a normal installation we can say that you run initdb once in the life of the server

- How do I see all of the databases on this strange world?
To be continued…

### Links
- [PostgreSQL: The world’s most advanced open source database](https://www.postgresql.org)
