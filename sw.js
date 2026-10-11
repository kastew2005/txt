"use strict";
const CACHE_NAME = "cache-v30.6";
const CORE_ASSETS = ["./", "./index.html", "./style.css?v=30.6", "./database.js?v=30.6", "./game.js?v=30.6", "./manifest.json", "./assets/icon.svg"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", event => { const request=event.request; if(request.method!=="GET"||new URL(request.url).origin!==self.location.origin)return; event.respondWith(caches.match(request).then(cached=>cached||caches.match(request,{ignoreSearch:true})).then(cached=>cached||fetch(request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));}return response;}).catch(()=>request.mode==="navigate"?caches.match("./index.html"):Response.error()))); });
