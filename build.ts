const cmd=Deno.run({
  cmd: ["gulp"]
});
await cmd.status();