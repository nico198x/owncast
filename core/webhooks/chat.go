package webhooks

import (
	"github.com/owncast/owncast/core/chat/events"
	"github.com/owncast/owncast/models"
)

// SendChatEvent will send a chat event to webhook destinations.
func SendChatEvent(chatEvent *events.UserMessageEvent) {
	webhookEvent := WebhookEvent{
		Type: chatEvent.GetMessageType(),
		EventData: map[string]interface{}{
			"user":      chatEvent.User,
			"body":      chatEvent.Body,
			"clientId":  chatEvent.ClientID,
			"rawBody":   chatEvent.RawBody,
			"id":        chatEvent.ID,
			"visible":   chatEvent.HiddenAt == nil,
			"timestamp": &chatEvent.Timestamp,
			"status":    getStatus(),
		},
	}

	SendEventToWebhooks(webhookEvent)
}

// SendChatEventUsernameChanged will send a username changed event to webhook destinations.
func SendChatEventUsernameChanged(event events.NameChangeEvent) {
	webhookEvent := WebhookEvent{
		Type: models.UserNameChanged,
		EventData: map[string]interface{}{
			"id":        event.ID,
			"timestamp": event.Timestamp,
			"user":      event.User,
			"newName":   event.NewName,
			"status":    getStatus(),
		},
	}

	SendEventToWebhooks(webhookEvent)
}

// SendChatEventUserJoined sends a webhook notifying that a user has joined.
func SendChatEventUserJoined(event events.UserJoinedEvent) {
	webhookEvent := WebhookEvent{
		Type: models.UserJoined,
		EventData: map[string]interface{}{
			"id":        event.ID,
			"timestamp": event.Timestamp,
			"user":      event.User,
			"status":    getStatus(),
		},
	}

	SendEventToWebhooks(webhookEvent)
}

// SendChatEventUserParted sends a webhook notifying that a user has parted.
func SendChatEventUserParted(event events.UserPartEvent) {
	webhookEvent := WebhookEvent{
		Type: events.UserParted,
		EventData: map[string]interface{}{
			"id":        event.ID,
			"timestamp": event.Timestamp,
			"user":      event.User,
			"status":    getStatus(),
		},
	}

	SendEventToWebhooks(webhookEvent)
}

// SendChatEventSetMessageVisibility sends a webhook notifying that the visibility of one or more
// messages has changed.
func SendChatEventSetMessageVisibility(event events.SetMessageVisibilityEvent) {
	webhookEvent := WebhookEvent{
		Type: models.VisibiltyToggled,
		EventData: map[string]interface{}{
			"id":        event.ID,
			"timestamp": event.Timestamp,
			"user":      event.User,
			"visible":   event.Visible,
			"ids":       event.MessageIDs,
			"status":    getStatus(),
		},
	}

	SendEventToWebhooks(webhookEvent)
}
