---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/nickgraffis.png',
    name: 'Nick Graffis',
    title: 'Author',
    links: [
      { icon: 'github', link: 'https://github.com/nickgraffis' },
      { icon: 'twitter', link: 'https://twitter.com/nickgraffistwit' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/nickgraffis' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>