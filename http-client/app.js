const {
    HttpClient,
    HttpMethod,
}= require('./http-client')

const main = async () => {
    const client = new HttpClient()
    let response

    client
        .setMethod(HttpMethod.GET)
        .setUrl('https://reqbin.com/echo')
    response = await client.sendRequest()
    console.log(response)

    client
        .setMethod(HttpMethod.POST)
        .setUrl('https://reqbin.com/echo/post/json')
        .setData({
            Id: 12345,
            Customer: 'Owen Li',
            Quantity: 7,
            Price: 99.00
        })
    response = await client.sendRequest()
    console.log(response)
}

main()