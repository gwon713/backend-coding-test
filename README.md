# Capa backend coding test

## About this task

Think of this as an open source project. How would this have to look in order for you to be impressed with it.

Please spend at least 90 minutes on this test. Feel free to take more time if you wish - make sure you are happy with your submission!

_Hint_: we are looking for a high-quality submission with great application architecture. Not a "get it done" approach.

Remember that this test is your opportunity to show us how you think. Be clear about how you make decisions in your code, whether that is with comments, tests, or how you name things.

## What to do

### First

* Create a new Javascript-based api service (any framework is fine)
  * TypeScript would be good, too.

### Make your API consumer happy

Let API consumer

* can get the list of stores in `stores.json`
* can get the specific item of stores in `stores.json`
  * Your API consumer can identify the item with its name
* can get the latitude and longitude for each postcode.
  * You can use postcodes.io to get the latitude and longitudefor each postcode.
* can get the functionality that allows you to return a list of stores in a given radius of a given postcode in the UK. The list must be ordered from north to south.

### Finally

* Send the link of your repository.
* Provide answers for the following questions with your submission:
  1. If you had chosen to spend more time on this test, what would you have done differently?
  2. What part did you find the hardest? What part are you most proud of? In both cases, why?
  3. What is one thing we could do to improve this test?


# Result 

## Start 
``` bash 
docker-compose up -d --build
```

## Test 

### -  can get the list of stores in `stores.json`
#### - RestAPI
  >
    GET - http://localhost:3000/stores
  >

#### - Result Ex

  >
    {
      "result": [
          {
              "name": "St_Albans"
          },
          {
              "name": "Hatfield"
          },
          {
              "name": "Worthing"
          },
          {
              "name": "Rustington"
          },
          {
              "name": "Eastbourne"
          },
          {
              "name": "Hove"
          }
          ........
      ]
    }
  >
### - can get the specific item of stores in `stores.json`
  #### - RestAPI
  >
    GET - http://localhost:3000/store/:name/items
  >
  #### - Result Ex
  >
    GET - http://localhost:3000/store/Rustington/items
  >
  >
    {
      "result": {
          "name": "Rustington",
          "postcode": "BN16 3RT"
      }
    }
  >
### - can get the latitude and longitude for each postcode.
  #### - RestAPI
  >
    GET - http://localhost:3000/location/:postcode
  >
  #### - Result Ex
  >
    GET - http://localhost:3000/location/BN14 9GB
  >
  >
    {
      "result": {
          "postcode": "BN14 9GB",
          "longitude": -0.366858,
          "latitude": 50.834431
      }
    }
  >
  
### - can get the functionality that allows you to return a list of stores in a given radius of a given postcode in the UK. The list must be ordered from north to south.
  #### - RestAPI
  >
    GET - /store/:postcode/arround?rad=?
  >
  #### - Result Ex
  >
    GET - http://localhost:3000/store/BN14 9GB/arround/?rad=1000
  >
  >
    {
        "result": [
            {
                "name": "Worthing"
            }
        ]
    }
  >
# Answering Questions
### * Provide answers for the following questions with your submission:
  #### Q 1. If you had chosen to spend more time on this test, what would you have done differently?

  ##### Answer
  ##### 시간이 더 있었다면 데이터의 양이 커질 때를 대비하기 위해 Elastic Search를 사용해서 각 API마다 검색시간을 줄이고 싶습니다.

  #### Q 2. What part did you find the hardest? What part are you most proud of? In both cases, why?

  ##### Answer
  ##### 마지막 API였던 주어진 우편번호를 통해 상점 목록을 반환하는 동작이 가장 어려웠습니다. <br/> postcode io를 사용하기 때문에 데이터를 parsing하고 비교하는 작업이 제일 어려웠습니다. <br/> 제일 자랑스러운 부분은 마지막 API에서 Store Data 와 Array_geoResult 비교하는 부분에서 filter와 find를 사용해서 데이터를 비교 후 반환하는 부분입니다.
  
  #### Q 3. What is one thing we could do to improve this test?

  ##### Answer
  ##### Mocking 할 데이터양이 많지 않아서 마지막 API 동작을 확인하는 데 어려움이 있었고 Mocking 데이터가 좀 더 많았으면 좋겠습니다.