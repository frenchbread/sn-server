import pckg from '../../package.json'

module.exports = () => ({
  title: 'Home',
  header: pckg.name,
  description: pckg.description
})
