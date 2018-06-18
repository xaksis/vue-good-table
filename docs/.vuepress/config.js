module.exports = {
  title: 'vue-good-table',
  description: 'A powerful and easy to use data table plugin for VueJS',
  base: '/vue-good-table/',
  themeConfig: {
    repo: 'xaksis/vue-good-table',
    sidebar: {
      '/guide/': [
        {
          title: 'Introduction',
          collapsable: false,
          children: [
            '',
          ]
        },
        {
          title: 'Configuration',
          collapsable: false,
          children: [
            '/guide/configuration/',
            '/guide/configuration/table-events',
            '/guide/configuration/search-options',
            '/guide/configuration/sort-options',
            '/guide/configuration/pagination-options',
            '/guide/configuration/column-options',
            '/guide/configuration/column-filter-options',
          ]
        },
        {
          title: 'Avanced Configuration',
          collapsable: false,
          children: [
            '/guide/advanced/',
            '/guide/advanced/checkbox-table',
            '/guide/advanced/grouped-table',
            '/guide/advanced/remote-workflow',
          ]
        },
        {
          title: 'Style Configuration',
          collapsable: false,
          children: [
            '/guide/style-configuration/',
            '/guide/style-configuration/style-classes',
          ]
        },
      ],
    },
  }
}