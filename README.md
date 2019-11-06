# Lottery

A lottery application on [egg](https://eggjs.org/)

## Installation

Clone this repository to get lottery:

```
$ git clone git@github.com:jinhucheung/lottery.git
```

Then copy configurations:

```
$ cd lottery
$ cp database/config.json.example database/config.json
```

And execute:

```
$ yarn install
```

Then do migrate:

```
$ npx sequelize db:create
$ npx sequelize db:migrate
$ npx sequelize db:seed:all
```

## Usage

Start application:

```
$ yarn run dev
```

## Thanks

+ [egg](https://eggjs.org/)
+ [egg-vue-webpack-boilerplate](https://github.com/easy-team/egg-vue-webpack-boilerplate)
+ [lucky_wheel](https://github.com/landluck/lucky_wheel)
+ [lottery-wheel](https://github.com/fralonra/lottery-wheel)

## Contributing

Bug report or pull request are welcome.

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)

Please write unit test with your code if necessary.

## License

The repository is available as open source under the terms of the [MIT License](MIT-LICENSE).
