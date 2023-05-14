const formatDate = (date, dateStyle = "short", timeStyle = "short") =>
  new Intl.DateTimeFormat("en-EN", {
    dateStyle,
    timeStyle,
  }).format(date)

export default formatDate
