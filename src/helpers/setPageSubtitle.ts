export default (subtitle: string) => {
  const title = document.title.split(' - ')
  title[2] = subtitle
  document.title = title.join(' - ').toString()
}
