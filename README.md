# wuvt-signal

Code for a wuvt signal & SMS bot


### signal

See `signal/app.py`. Requires signald + pysignald. Must provide `SIGNAL_NUMBER` env var.


### sms

See `sms/index.js`. Requires lambda to respond and AWS pinpoint + an SNS topic to receive messages.
