/** InfluxDB v2 URL */
const url = process.env['INFLUX_URL'] || 'http://influxdb:8086'
/** InfluxDB authorization token */
const token = process.env['INFLUX_TOKEN'] || 'my-token'
/** Organization within InfluxDB  */
const org = process.env['INFLUX_ORG'] || 'my-org'
/**InfluxDB bucket used in examples  */
const bucket = 'logsdata'
// ONLY onboarding example
/**InfluxDB user  */
const username = 'root'
/**InfluxDB password  */
const password = ''

module.exports = {
  url,
  token,
  org,
  bucket,
  username,
  password,
}