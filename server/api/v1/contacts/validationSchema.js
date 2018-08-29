exports.requestPayload = {
  type: 'object',
  properties: {
    blocking: {
      type: 'string',
      required: false
    },
    contacts: {
      type: 'array',
      items: {
        type: 'string',
        required: true
      }
    }
  }
}

exports.contactPayload = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: false
    },
    phone: {
      type: 'string',
      required: true
    }
  }
}
