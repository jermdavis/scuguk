# Sitecore User Group UK

Now with NextJS!

## Wishlist

- Add support for dietary requirements when booking attendance

## Getting Started

### Local Install 

1. cd to the project folder, e.g: `C:\Projects\scuguk\src`
2. run: `npm install`
3. run: `npm install --global yarn`

### Local Development

1. run: `yarn prebuild` to copy over all the images 
2. run one of the following to start the development server:

```bash
yarn dev
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the Site.

**_Notes:_**
* Before you commit a new or updated event, run `yarn build` to generate all the files and then `yarn events` to generate the socials image. 
  If you're updating an event with new speakers, you will need to delete the old generated event image under `public\events` _before_ rebuilding.
* You can use `<p className="alert alert-warning"></p>` in the `intro` field for a callout block, such as highlighting a change of venue.

**_Schema Info for creating new events:_**

* Fields for an event:
  * `eventId`: A guid taken from the booking database. Must be unique per event, and the database needs to be set up before publishing the event for the bookings to work.
  * `title`: The title used in both the listing of events and the H1 of the event page itself. Usually includes location, event type and date. e.g. "London Sitecore User Group - September 2026"
  * `excerpt`: The summary used on the listing page. A string with optional markup. Can use literal or folded blocks (`|` or `>`) in the value.
  * `intro`: The detailed description of the event, displayed at the top of the event page. A string with optional markup. Can use literal or folded blocks (`|` or `>`) in the value.
  * `date`: The date / time of the event start. Should be in the format `!!timestamp 2026-09-24 17:45:00+01:00`. Note the use of the timezone modifier. This must match whether the event is in daylight saving time or not.
  * `duration`: Expected length in minutes. Integer. 
  * `dateConfirmed`: Boolean. True if the date is fixed.
  * `showOnlineRsvp`: 
  * `showEventImage`: Controls whether the top of the event detail page shows the image of the same name as the event file or not
  * `talksTbc`: Controls if a box is shown below the agenda asking if people want to speak, and linking to the contact form
  * `sponsors`: A list of string sponsor names. Note these names must match the names of yml files in the `sponsor` data folder. Do not put the extension here.
  * `venue`: An object describing the location of the event
	* `name`: The display name for the location. A building or business name usually.
	* `address`: The address as a single (comma separated) line. This is used to generate the map when the location is clicked, so needs to be accurate.
  * `location`: The name of a file in the `locations` data folder (minus its extension) to specify the main image used in the OpenGraph image for the event.
  * `agenda`: An object which describes the sections of the event.
	* `type`: Defines the sort of agenda item being displayed. Needed for all agenda items. Can be one of three values:
	  * For an item that has not been sorted out, use `tbd` to show that it is currently unplanned. Only the `time` field is relevant if this is picked.
	  * For a talk from a speaker, use `talk`. This will display all the relevant details from other fields.
      * For a non-talk agenda item (like a break or food etc) use `item`. Similarly to "tbd" the time field is relevant for this. But this also requires "description" 
    * `time`: The time at which this item will start. Needed for all agenda items. Format is "hh:mm" in (24hr clock) and note that this does not pay attention to the timezone offset mentioned above.
    * `speaker` or `speakers`: If only one person is presenting use the singular. If multiple people, use the plural and format as a yml list. Each entry must be a file name from the `speakers` folder without its extension. If the speaker is unknown, use `tbd`.
	* `title`: The title for a speaker's talk
	* `description`: Used for both the summary of a speaker's talk, or the name/explanation of a non-talk item like a break.
  * `meta`: an object to describe the page
	* `description`: The string used for the page's html metadata description, as seen by search engines.

* Fields for a speaker:
  The yml file name must match the name used in the speaker(s) field above. There should also be an image file.
  * `name`: The display name for the speaker. Required. "Firstname Lastname" usually, but should match what the speaker goes by.
  * `title`: Optional. The speaker's job title.
  * `company`: Optional. The name of the company the speaker works for.
  * `image`: The name of the image file to use for their headshot. Required. Should be the name and extension of an image saved in the same folder as the speaker's yml file.

* Fields for a sponsor:
  The yml file name must match the name used in the sponsors field above. There should also be a logo image file alongside it.
  * `title`: The name of the company, as they would write it.
  * `image`: The name of the logo image file, which should sit in the same folder as this yml file.
  * `website`: The URL of the company's site - used as the hyperlink on logos.
  * `lastSponsorDate`: Formatted as `!!timestamp 2023-01-11` and specifying the last event the sponsor provided. Used for ordering the sponsors list page.
  * `description`: A description of the sponsor company, as they would describe themselves.

* Fields for a location:
  Locations are just image files. They do not have a yml field with fields.