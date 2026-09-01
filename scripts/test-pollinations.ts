async function test() {
  const models = ['openai', 'mistral', 'llama', 'qwen-2.5-72b'];
  for (const model of models) {
    try {
      console.log(`Testing model: ${model}...`);
      const start = Date.now();
      const response = await fetch(`https://text.pollinations.ai/?model=${model}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "user", content: "Say hello in 3 words." }
          ]
        })
      });
      const duration = Date.now() - start;
      if (response.ok) {
        const text = await response.text();
        console.log(`✅ Model ${model} succeeded in ${duration}ms: "${text.trim()}"`);
      } else {
        console.log(`❌ Model ${model} failed: ${response.status} ${response.statusText}`);
      }
    } catch (err: any) {
      console.log(`❌ Model ${model} threw error: ${err.message}`);
    }
  }
}

test();
