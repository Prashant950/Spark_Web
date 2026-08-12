# Quick Payment Testing Guide 🚀

## Pre-Flight Checklist (Do This First!)

```bash
# 1. Terminal 1 - Start Backend
cd d:\sparx\server
npm run dev
# Wait for: "Server running on port 5000"

# 2. Terminal 2 - Start Frontend  
cd d:\sparx\client
npm run dev
# Wait for: "VITE v... ready in ... ms"

# 3. Open Browser
# Go to: http://localhost:5173
```

## Environment Variables Required (.env in server folder)

```
RAZORPAY_API_KEY=your_api_key_from_razorpay_dashboard
RAZORPAY_SECRET_KEY=your_secret_key_from_razorpay_dashboard
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_specific_password
JWT_SECRET=any_random_string_min_32_chars
MONGO_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## 60-Second Payment Test

### Step 1: Login (10 seconds)
```
1. Click "Login" on homepage
2. Enter your credentials
3. Click "Sign In"
4. Wait for dashboard to load
```

### Step 2: Open Payment Modal (5 seconds)
```
1. Click "Services" or "Buy Services" button
2. BuyServicesModal should pop up
3. See all 12 services listed
```

### Step 3: Select Services (10 seconds)
```
1. Click on any service (e.g., "Movie Partner - ₹1")
2. It should highlight in purple with checkmark
3. See total amount update at bottom
4. Click another service
5. See count update ("2 services selected")
```

### Step 4: Complete Payment (35 seconds)
```
1. Click "Pay ₹XXX" button
2. Button shows "Processing..." (3-5 seconds)
3. Razorpay modal opens automatically
4. Enter test card details:
   Card: 4111 1111 1111 1111
   Expiry: 12/25
   CVV: 123
   OTP: 123456
5. Click "Pay" on Razorpay
6. Modal closes automatically
7. Success alert appears
8. Modal closes
```

---

## Test Card Numbers

### ✅ Success Cards
```
VISA:
4111 1111 1111 1111
Any future expiry
Any 3-digit CVV

MASTERCARD:
5555 5555 5555 4444
Any future expiry
Any 3-digit CVV
```

### ❌ Failed Payment
```
4222 2222 2222 2222
(Use this to test failure handling)
```

---

## What to Look For

### Network Tab (Chrome DevTools)
1. Press F12 → Network tab
2. Should see 2 POST requests:
   - `create-order` → 200 OK
   - `verify-payment` → 200 OK

### Console (F12 → Console)
- Should be **no red errors**
- May see Razorpay script loading

### Razorpay Modal
- Should show amount with GST
- Should show all services ordered
- Should look professional

### Success Alert
- Should say: "✅ Payment Successful! Confirmation email has been sent."

### Email
- Check inbox (and spam folder) for confirmation email
- Should have:
  - Service names and prices
  - Subtotal, GST, Total
  - Payment ID

---

## Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| "window.Razorpay is not defined" | Clear cache & refresh (Ctrl+Shift+R) |
| "Order creation failed" | Check backend is running on port 5000 |
| "Payment failed" | Use correct test card: 4111 1111 1111 1111 |
| "No email received" | Check spam folder, verify EMAIL_PASS |
| Button shows "Processing..." forever | Backend error - check server logs |
| Modal doesn't close | Payment verification failed - check secrets |

---

## Verifying Everything Works

### ✅ Test 1: Services Display
- [ ] All 12 services show in modal
- [ ] Prices display correctly in ₹ format
- [ ] Each service has a price/session label

### ✅ Test 2: Selection Works
- [ ] Click service → highlights purple
- [ ] Click again → unhighlights
- [ ] Total updates correctly
- [ ] Count updates ("X services selected")

### ✅ Test 3: Payment Button
- [ ] Shows "Pay ₹XXX" initially
- [ ] Becomes "Processing..." when clicked
- [ ] Button is disabled during payment
- [ ] Cancel button still works

### ✅ Test 4: Razorpay Opens
- [ ] Modal opens after order created
- [ ] Shows correct amount
- [ ] Amount = (sum of prices × 1.18) for GST
- [ ] Color theme is purple

### ✅ Test 5: Payment Succeeds
- [ ] Card 4111 1111 1111 1111 works
- [ ] OTP 123456 works
- [ ] Success alert appears
- [ ] Modal closes

### ✅ Test 6: Email Received
- [ ] Confirmation email arrives
- [ ] Has service details
- [ ] Has total amount
- [ ] Professional formatting

### ✅ Test 7: Database Updated
- Check MongoDB:
```javascript
// Connect to MongoDB Atlas
db.payments.find().pretty()
// Should show payment record with status: "completed"
```

---

## Backend Logs to Check

In server terminal, you should see:

```
✅ Order Created Successfully
- orderId: order_OiR2G9ABCDE
- amount: 118118 (paise)

✅ Payment Verified
- paymentId: pay_OiR2GxYzABC
- signature: verified
- status: completed

✅ Email Sent
- to: user@example.com
- subject: Payment Confirmation - Services Booked
```

---

## If Payment Fails

### Step 1: Check Server Logs
```bash
# Terminal running backend server should show errors
# Look for lines starting with "Error:" or "❌"
```

### Step 2: Check Network Tab
```
F12 → Network tab
Click Pay button
Check the POST requests:
1. create-order - should be 200 OK
2. verify-payment - might show error status
```

### Step 3: Check .env File
```bash
# Make sure in server/.env:
RAZORPAY_API_KEY=rzp_live_xxxxx (not empty)
RAZORPAY_SECRET_KEY=xxxxx (not empty)
```

### Step 4: Restart Everything
```bash
# Terminal 1: Stop server (Ctrl+C), then:
npm run dev

# Terminal 2: Stop frontend (Ctrl+C), then:
npm run dev

# Browser: Hard refresh (Ctrl+Shift+R)
```

---

## Payment Status Database Check

```bash
# Connect to MongoDB
# After successful payment, you should see:

{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."),
  "orderId": "order_OiR2G9ABCDE",
  "paymentId": "pay_OiR2GxYzABC",
  "signature": "verified_signature_hash",
  "services": [
    {
      "serviceId": 1,
      "title": "Movie Partner",
      "price": 1
    }
  ],
  "subtotal": 1,
  "gst": 0.18,
  "amount": 1.18,
  "status": "completed",      # ← This should be "completed"
  "userEmail": "user@email.com",
  "createdAt": ISODate("2024-08-12T..."),
  "updatedAt": ISODate("2024-08-12T...")
}
```

---

## Success = All These Working ✅

- [x] Services display in modal
- [x] Can select/deselect services  
- [x] Total calculates with 18% GST
- [x] Pay button opens Razorpay
- [x] Razorpay accepts test card
- [x] Payment verifies successfully
- [x] Success alert shows
- [x] Confirmation email received
- [x] Payment recorded in database with status "completed"
- [x] No errors in console or server logs

---

## Now You're Ready! 🎉

Start the servers and test a payment flow. Let me know if anything doesn't work!

**Questions?**
- Check backend logs in terminal
- Check network tab in DevTools
- Check browser console for errors
- Check MongoDB for payment records
