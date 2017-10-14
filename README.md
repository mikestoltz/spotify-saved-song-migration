## Spotify saved song migration.

If you're like me, you created your spotify account years ago using your Facebook account. Now you want to delete your Facebook account but cannot since you cannot unlink it from your Spotify account and its the only way you can authenticate! Spotify's amazing solution to this problem is to tell you to delete your current account and create a new one. People on forums claim you can submit a support ticket to Spotify to have them migrate your music over for you, however when I did I recieved no response - so I wrote this.

I wasn't too worried about my playlists, just my huge library of "saved songs" I had collected over the years. I do however intend to update this to move playlists as well.

### Prereqs:
- To run this you will need a basic understanding of using the terminal and accessing your browser's cookies.
- You will also need to have both your old and new Spotify accounts active. You can always update the email on the second account later after you delete the original account if you're hung up on wanting to use the same one.

### Instructions
1. Install [Node.js](https://nodejs.org/en/) on your computer (you must use version 8.x or higher).
2. Log into the Spotify web player with your old Spotify account. Look in your browser cookies and get the value for `wp_access_token` - I will refer to this value as `old access token`
3. Log out and log back in to the Spotify web player using your new account. Look in your browser cookies and get the value for `wp_access_token` again - I will refer to this value as `new access token`
4. Clone this repo, cd into it using terminal.
5. run `$ npm install`
6. run `$ OLD_AUTH_TOKEN=<old access token> NEW_AUTH_TOKEN=<new access token> npm run migration`

### TODO
- [ ] Migrate playlists
- [ ] Make into a CLI
- [ ] Add tests