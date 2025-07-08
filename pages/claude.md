# Vue 3 Routes and Pages

<overview>
The pages folder holds all your app's routes. Nuxt uses Vue Router and creates routes based on your file names and folder structure.
</overview>

<rules>
  <rule>
    <action>Check</action>
    <target>https://uvr.esm.is/llms.txt</target>
    <reason>Find the latest info on topics not covered here</reason>
  </rule>
  
  <rule>
    <action>Never use</action>
    <target>index.vue files</target>
    <alternative>Use group names like (home).vue instead</alternative>
  </rule>
  
  <rule>
    <action>Always use clear names</action>
    <target>Route parameters</target>
    <examples>
      <good>userId, postSlug, productId</good>
      <bad>id, slug, item</bad>
    </examples>
  </rule>
  
  <rule>
    <action>Use dots in file names</action>
    <target>Create paths without nesting</target>
    <example>users.edit.vue creates /users/edit</example>
  </rule>
  
  <rule>
    <action>Use double brackets</action>
    <target>Optional parameters</target>
    <example>[[paramName]]</example>
  </rule>
  
  <rule>
    <action>Add + after brackets</action>
    <target>Repeating parameters</target>
    <example>/posts.[[slug]]+.vue matches both /posts/some-post and /posts/some/post</example>
  </rule>
  
  <rule>
    <action>Use definePage()</action>
    <target>Set route properties</target>
    <properties>meta, name, path, alias</properties>
  </rule>
  
  <rule>
    <action>Always check</action>
    <target>typed-router.d.ts file</target>
    <reason>Find correct route names and parameters</reason>
  </rule>
  
  <rule>
    <action>Use named routes</action>
    <target>Navigation</target>
    <good>router.push({ name: '/users/[userId]', params: { userId } })</good>
    <bad>router.push('/users/' + userId)</bad>
  </rule>
  
  <rule>
    <action>Pass route name</action>
    <target>useRoute() function</target>
    <example>useRoute('/users/[userId]')</example>
    <benefit>Get better type checking</benefit>
  </rule>
</rules>

<examples>
  <example>
    <title>Basic File Structure</title>
    <structure>
      src/pages/
      ├── (home).vue         # Groups make routes clearer
      ├── about.vue
      ├── [...path].vue      # Catches all unknown routes
      ├── users.edit.vue     # Dots create paths without nesting
      ├── users.vue          # Layout for user routes
      └── users/
          ├── (user-list).vue
          └── [userId].vue
    </structure>
  </example>

  <example>
    <title>This Site's Structure</title>
    <structure>
      pages/
      ├── (home).vue              # Home page
      ├── [...path].vue           # Catches all content pages
      ├── animation-demo.vue      # Shows animations
      ├── blog/
      │   ├── (blog-list).vue     # Lists all blog posts
      │   └── [postSlug].vue      # Shows one blog post
      ├── design-system.vue       # Shows design components
      ├── design-system-preview.vue
      ├── design-system-contrast.vue
      └── share-demo.vue          # Shows social sharing
    </structure>
    
    <improvements>
      <improvement>Group names like (home) make routes clearer</improvement>
      <improvement>Clear params like [postSlug] beat generic [slug]</improvement>
      <improvement>Better catch-all name [...path] instead of [...slug]</improvement>
    </improvements>
  </example>

  <example>
    <title>Route Groups for Layouts</title>
    <description>Groups create layouts without changing URLs</description>
    
    <structure>
      src/pages/
      ├── (admin).vue      # Layout wraps all admin pages
      ├── (admin)/
      │   ├── dashboard.vue
      │   └── settings.vue
      └── (user)/
          ├── profile.vue
          └── order.vue
    </structure>
    
    <routes>
      <route>
        <url>/dashboard</url>
        <file>src/pages/(admin)/dashboard.vue</file>
      </route>
      <route>
        <url>/settings</url>
        <file>src/pages/(admin)/settings.vue</file>
      </route>
      <route>
        <url>/profile</url>
        <file>src/pages/(user)/profile.vue</file>
      </route>
      <route>
        <url>/order</url>
        <file>src/pages/(user)/order.vue</file>
      </route>
    </routes>
  </example>
</examples>
