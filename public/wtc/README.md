# WTC event programme banners

The landing page is `/wtc-event`. Replace these temporary programme images in place:

| Programme | Current portrait | Recommended replacement size |
| --- | --- | --- |
| CPD Short Courses | `cpd-portrait-hd.webp` | 1200 × 900 px |
| ATHE Level 7 Qualifications | `athe-portrait-hd.webp` | 1200 × 900 px |
| Jain University Master’s | `jain-portrait-hd.webp` | 1200 × 900 px |

Headings, descriptions and icons are now rendered as native page elements for crisp text at every screen size. Supply only the portrait artwork, with no repeated titles or icons. A 4:3 image (1200 × 900 px or larger) matches the image area. Keep the face comfortably inside the frame. Current portraits were recreated at higher resolution from the reference; they are temporary artwork.


Registration requires the API deployment containing `/api/v1/public/wtc-registrations`.
The API uses the existing Mailjet configuration, sends confirmation to the visitor,
and sends a separate “WTC new registration” notification to `enrol@inspire.college`. Repeat submissions update changed CRM details and retry only unsent emails. CRM records use source `wtc_registrations_form`
and include the exact label `WTC registrations form` in the message, notes and activity.
