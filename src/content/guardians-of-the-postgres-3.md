---
date: 2020-04-30T00:07:27.264Z
title: Guardians of the Postgres, The Search for Postgres, The Never Ending Postgres Part 3
tags: Postgres, Node, Learning, Weird
type: exploration
---

# Day 3

I knew the mountain I had to climb today so I reviewed what I knew about postgres to prepare me: create and dropping databases, listing databases to prove it created or dropped, and opening psql for a named database,   I was really hoping the error would just go away today.  Sometimes that happens with JavaScript, apparently not with postgres.

`Error: role "postgres" does not exist`

 At first I read it wrong and thought postgres does not exist but upon deeper head scratching I saw that all important but dwarfed  by `Error` word `role`.  Time the mother out!  So we have postgres the tech,  postgres the database and now postgres the role… Seriously?!!?!?!  I know naming is the second hardest thing in development but I think we could have been just a little bit more descriptie. Maybe `postgresUser`, `jimmy`, or even `admin`?

I found out that I can rudimentary map of the role landscape hidden `psql` :

```psql
jordanpapaleo=# \du
                                     List of roles
   Role name   |                         Attributes                         | Member of
---------------+------------------------------------------------------------+-----------
 jordanpapaleo | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 jp-tester     |                                                            | {}
 newuser       | Create DB                                                  | {}

(END)
```

Seems like postgres, the role formerly known as database, formerly known as database technology,  is important and missing.  There is a 13 in 4 chance that I may have done this on a previous attempt to colonize Postgres.  You want a postgres super user, you got one.

```bash
$ createuser --help

# output

Usage:
  createuser [OPTION]... [ROLENAME]

Options:
  -c, --connection-limit=N  connection limit for role (default: no limit)
  -d, --createdb            role can create new databases
  -D, --no-createdb         role cannot create databases (default)
  -e, --echo                show the commands being sent to the server
  -g, --role=ROLE           new role will be a member of this role
  -i, --inherit             role inherits privileges of roles it is a
                            member of (default)
  -I, --no-inherit          role does not inherit privileges
  -l, --login               role can login (default)
  -L, --no-login            role cannot login
  -P, --pwprompt            assign a password to new role
  -r, --createrole          role can create new roles
  -R, --no-createrole       role cannot create roles (default)
  -s, --superuser           role will be superuser
  -S, --no-superuser        role will not be superuser (default)
  -V, --version             output version information, then exit
  --interactive             prompt for missing role name and attributes rather
                            than using defaults
  --replication             role can initiate replication
  --no-replication          role cannot initiate replication
  -?, --help                show this help, then exit
```

```bash
$ createuser -s postgres
```

Let’s double check in psql.

```bash
$ psql postgres

# from within psql

\du

# output

   Role name   |                         Attributes                         | Member of
---------------+------------------------------------------------------------+-----------
 jordanpapaleo | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 jp-tester     |                                                            | {}
 newuser       | Create DB                                                  | {}
 postgres      | Superuser, Create role, Create DB                          | {}
```

Looks like we have a few stragglers in there.  I checked my notes (yes that’s why I take them)  and in our binaries we have a command `dropuser`.  It does not take a rocket science to guess what this does.

```bash
# From our terminal, not psql
$ dropuser newuser
$ dropuser jp-tester
$ psql postgres

# From within psql

\du

# output

   Role name   |                         Attributes                         | Member of
---------------+------------------------------------------------------------+-----------
 jordanpapaleo | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
 postgres      | Superuser, Create role, Create DB                          | {}
```

Ok, trying my node command again…. Whoa… it worked.

I am going to start talking to someone for a minute.  No clue who I am talking to: internal monolog, the person reading this, a native inhabitant of postgres; totally up to you.

What do you mean, what node script ?  Seriously, I never told you about this…. Why don’t you take a look at day 1 paragraph 3.  Remember my node app?  Ah ha.  I am using the npm postgres package  to write postgres from within a node process.  This is the file I have been trying to run this whole time while be attacked by postgres trickery.

```javascript
// initdb.js
const postgres = require('postgres')

const initdb = async () => {
  try {
    const sql = postgres({
      database: 'jordan', // Name of database to connect to
      port: 5432, // Postgres server port
    })

    await sql`DROP TABLE IF EXISTS users`
    await sql`CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
      , user_id varchar(50) NOT NULL
      , measure_date date NOT NULL
      , weight numeric(5,1) NOT NULL
    )`

    await sql.end()
  } catch (err) {
    console.log(err)
    throw err
  }
}

initdb()
  .then(() => { console.log('FINISHED') })
  .catch(() => { console.log('YOU ARE A FAILURE') })
```

```javascript
node ./initdb.js
```

So we made a database, we made users, we figured out issues with the postgres role, and now, we actually created a table.  I just want to stop a minute and bask in this moment… until tomorrow.

## Links
- [postgresql - Specifying the default database for psql to connect to? - Stack Overflow](https://stackoverflow.com/questions/12919394/specifying-the-default-database-for-psql-to-connect-to)
- [PostgreSQL: Documentation: 12: 33.14. Environment Variables](https://www.postgresql.org/docs/current/libpq-envars.html)
- [macOS - psql: FATAL: role "postgres" does not exist - Stack Overflow](https://stackoverflow.com/questions/15301826/psql-fatal-role-postgres-does-not-exist)
