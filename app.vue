<template>
  <div id="app">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
/* Global Bear Blog inspired styles */
* {
  box-sizing: border-box;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

body {
  margin: 0;
  padding: 1rem;
  background-color: #fff;
  max-width: 900px;
  margin: 0 auto;
}

#app {
  min-height: 100vh;
}

/* Typography */
h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.2;
  margin-top: 0;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1.25rem;
}

p {
  margin-bottom: 1rem;
}

/* Links */
a {
  color: #333;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Content rendering styles */
.prose {
  max-width: none;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose p {
  margin-bottom: 1rem;
}

.prose ul,
.prose ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose blockquote {
  border-left: 4px solid #ddd;
  margin: 1rem 0;
  padding-left: 1rem;
  color: #666;
}

.prose code {
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.prose pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin: 1rem 0;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
}

/* Responsive */
@media (max-width: 768px) {
  body {
    padding: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }
}
</style>
