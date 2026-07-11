import { CamelMailer } from 'camelmailer';

// Reads CAMELMAILER_API_KEY (and optionally CAMELMAILER_BASE_URL for
// self-hosted instances) from the environment.
const camelmailer = new CamelMailer();

const from = process.env.CAMELMAILER_FROM ?? 'you@yourdomain.com';
const to = process.env.CAMELMAILER_TO ?? 'delivered@example.com';

// 1. Send a plain email -----------------------------------------------------

const { data, error } = await camelmailer.emails.send({
  from,
  to,
  subject: 'Hello from CamelMailer',
  html_body: '<strong>It works!</strong>',
});

if (error) {
  console.error(`Send failed — ${error.code}: ${error.message}`);
  process.exit(1);
}
console.log('Sent message', data?.message_id);

// 2. Send with a stored template --------------------------------------------

// Create the template on first run; ignore the error if it already exists.
await camelmailer.templates.create({
  name: 'Welcome',
  subject: 'Welcome, {{ name }}!',
  html_body: '<p>Hi {{ name }}, thanks for trying {{ product }}.</p>',
});

const templated = await camelmailer.emails.sendWithTemplate({
  from,
  to,
  template: 'welcome',
  template_model: { name: 'Ada', product: 'CamelMailer' },
});

if (templated.error) {
  console.error(`Template send failed — ${templated.error.code}: ${templated.error.message}`);
} else {
  console.log('Sent templated message', templated.data?.message_id);
}

// 3. Batch send — one request, per-message results ---------------------------

const batch = await camelmailer.emails.sendBatch([
  { from, to, subject: 'Batch one', text_body: 'First message of the batch.' },
  { from, to, subject: 'Batch two', text_body: 'Second message of the batch.' },
]);

batch.data?.messages.forEach((entry, i) => {
  if (entry.status === 'success') {
    console.log(`Batch entry ${i} sent as message`, entry.data.message_id);
  } else {
    console.warn(`Batch entry ${i} failed — ${entry.error.code}`);
  }
});
