# Angular State Management

## Overview

We need to create a front-end application that allows students to create a registration for an upcoming course.

### End Result

```yaml
operator: REGISTRATION_REQUESTED
operands:
  - name: student
    description: The id of the student making the registration
    type: sub
  - name: courseOffering
    description: The id of the course offering for which the student wishes to enroll.
    type: ref
  - name: agreesToParticipate
    description: The user agrees to participate in all days of training.
    type: bool
  - name: agreesToPay
    description: The user agrees to pay for the course
    type: bool
  - name: amount
    description: The amount the user agrees to pay
    type: decimal
  - name: comments
    description: Any comments, required if agrees-to-participate is false
    type: string
```

## Operand Reference

### sub

The subject from the auth token.

Source: Identity Server (Keycloak)

Example:

```json
"3ff42634-b465-474b-bd1c-0cd4cf122228"
```

### course-offering

The ID (string) and Revision (int32) of a course offering.

Example:

```json
{
  "offering-id": "0dbc2379-7ce4-48f2-80c6-65366e57abd4",
  "revision": 3
}
```
