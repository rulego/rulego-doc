---
title: gitCreateTag
permalink: /pages/ci-git-create-tag/
---
`ci/gitCreateTag` Component: <Badge text="v0.25.0+"/> Git tag creation component, used for creating git tags.

> Additional library required: [rulego-components-ci](https://github.com/rulego/rulego-components-ci)

## Configuration

| Field     | Type      | Description        | Default Value                    |
|-----------|-----------|--------------------|----------------------------------|
| directory | string    | Local directory    | Obtained from metadata's workDir |
| tag       | string    | Tag name           |                                  |
| message   | string    | Tag message        |                                  |
| signature | Signature | Author information | Empty                            |

**Signature:**

| Field       | Type   | Description    | Default Value |
|-------------|--------|----------------|---------------|
| authorName  | string | Author's name  |               |
| authorEmail | string | Author's email |               |

> All fields above can use [component configuration variables](/en/pages/component-configuration-variables/)

## Relation Type

- ***Success:*** On successful execution, the message is sent to the `Success` chain.
- ***Failure:*** On failed execution, the message is sent to the `Failure` chain.

## Execution Results

- This component does not change the value of `msg.Data`.
- Obtain the tag hash of this operation through the `msg.Metadata` hash.
