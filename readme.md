# Redis with node example

This Repository contains the example of the usage of Redis-server with node.

## installation

install redis-server on your machine and start the server.

## usage, run following commands in the terminal

```
redis-server
redis-cli
```

## basic commands of string for cli

```
SET key value e.g SET name "John"
GET key e.g GET name
DEL key e.g DEL name
EXISTS key e.g EXISTS name
key _ e.g keys _ (to get all keys)
flushall e.g flushall (to delete all keys)

ttl key e.g ttl name (to get the time to live of the key)
expire key time e.g expire name 10 (to set the time to live of the key)
setex key time value e.g setex name 10 "John" (to set the time to live of the key)
```

## basic commands of list for cli

```
LPUSH key value e.g LPUSH name "John"
RPUSH key value e.g RPUSH name "John"
LRANGE key start stop e.g LRANGE name 0 -1 (print all the values of the list)
LPOP key e.g LPOP name
RPOP key e.g RPOP name
LLEN key e.g LLEN name
LINDEX key index e.g LINDEX name 1
LINSERT key BEFORE|AFTER pivot value e.g LINSERT name BEFORE "John" "Doe"
LSET key index value e.g LSET name 1 "Doe"
LREM key count value e.g LREM name 2 "John"
```

## basic commands of set for cli

```
SADD key member e.g SADD name "John"
SMEMBERS key e.g SMEMBERS name
SISMEMBER key member e.g SISMEMBER name "John"
SCARD key e.g SCARD name
SREM key member e.g SREM name "John"
SPOP key e.g SPOP name
SRANDMEMBER key count e.g SRANDMEMBER name 2
```

## basic commands of hash for cli

```
HSET key field value e.g HSET user id 100
HGET key field e.g HGET user id
HGETALL key e.g HGETALL user
HDEL key field e.g HDEL user id
HEXISTS key field e.g HEXISTS user id
HKEYS key e.g HKEYS user
HVALS key e.g HVALS user
HLEN key e.g HLEN user
```
