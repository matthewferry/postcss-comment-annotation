workflow "Test" {
  on = "push"
  resolves = ["NPM test"]
}

action "NPM install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "install"
}

action "NPM lint" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "run lint"
  needs = ["NPM install"]
}

action "NPM test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "test"
  needs = ["NPM lint"]
}
