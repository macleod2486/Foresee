# Foresee

A Magic the Gathering price watcher.  


Example of inserting parameters

````
http://urlofthisinstallation:1337/insert?cardName=tester1&setName=tester2&highPrice=tester3&mediumPrice=tester4&lowPrice=tester5&source=Starcity
````

----

Example of getting parameters

````
http://urlofthisinstallation:1337/getList?setName=Zendikar
````
--

The getting will return a glob of json that can be parsed.

--

````
http://urlofthisinstallation:1337/getDistinctList?source=TCGPlayer
````

--

This will return distinct card names (Currently only supporting postgresql)

----

Deletes old records that are older than a day.

````
http://urlofthisinstallation:1337/delete
````

----

### Averages

----

Search in averages model to see if card exists in that model.

````
http://urlofyourinstallation:1337/averageRecordSearch?cardName=nameofcard&setName=nameofset&source=nameOfSource
````
----

Update averages

````
http://urlofyourinstallation:1337/updateAverage?cardName=nameofcard&setName=nameofset&highPrice=highprice&mediumPrice=mediumprice&lowPrice=lowprice&averageHighPrice=averagehighprice&averageMedPrice=averagemediumprice&averageLowPrice=averagelowprice
````

----

Insert average

````
http://urlofyourinstallation:1337/insertAverage?cardName=nameofcard&setName=nameofset&highPrice=highprice&mediumPrice=mediumprice&lowPrice=lowprice&averageHighPrice=averagehighprice&averageMedPrice=averagemediumprice&averageLowPrice=averagelowprice
````

----

Licensed under the GPL3
##

Dependencies:


* Mongo 3.1.x
* Sails 11.1
