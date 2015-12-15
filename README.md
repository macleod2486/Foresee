# Foresee

A Magic the Gathering price watcher.  


Example of inserting parameters

````
http://urlofthisinstallation:8080/insert?cardName=tester1&setName=tester2&highPrice=tester3&mediumPrice=tester4&lowPrice=tester5&source=Starcity
````

----

Example of getting parameters

````
http://urlofthisinstallation:8080/getList?setName=Zendikar
````
--

The getting will return a glob of json that can be parsed.

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

Dependencies:


* Mongo 3.1.x
* Sails 11.1
