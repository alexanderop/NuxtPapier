<template>
  <div class="container-main">
    <h1>Testing Tabs Component</h1>

    <h2>Direct Component Test</h2>
    <Tabs :labels="['npm', 'yarn', 'pnpm']">
      <pre><code>npm install package</code></pre>
      <pre><code>yarn add package</code></pre>
      <pre><code>pnpm add package</code></pre>
    </Tabs>

    <h2>Markdown Content Test</h2>
    <ContentDoc path="/blog/enhanced-content-example" />
  </div>
</template>
