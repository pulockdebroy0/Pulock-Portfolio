# Production Deployment Guide

## Pre-Deployment Checklist

### Domain Configuration
- [ ] Ensure your domain registrar points to Vercel nameservers
- [ ] Verify DNS records are properly configured
- [ ] Test domain resolves to `https://pulockdebroy.com`

### Environment Variables (if using database)
- [ ] DATABASE_URL is set in Vercel project settings
- [ ] All required environment variables are configured
- [ ] No secrets are hardcoded in the codebase

### Search Console Setup
- [ ] Add property for `https://pulockdebroy.com` in Google Search Console
- [ ] Verify domain ownership
- [ ] Submit updated sitemap via `/sitemap.xml`
- [ ] Check for any crawl errors

### Vercel Project Settings
- [ ] Production domain set to `pulockdebroy.com`
- [ ] Environment set to production
- [ ] Analytics enabled (for performance monitoring)

## Deployment Steps

### 1. Push Code to Main Branch
```bash
git add .
git commit -m "Production audit and optimization: domain migration, SEO enhancement, content rewrite"
git push origin main
```

### 2. Deploy to Vercel
- Vercel will automatically deploy when code is pushed to main
- Monitor deployment in Vercel dashboard
- Check build logs for any errors

### 3. Verify Deployment
```bash
# Test homepage loads
curl -I https://pulockdebroy.com

# Check security headers
curl -I https://pulockdebroy.com | grep -E "X-|Strict-Transport|Referrer-Policy"

# Verify sitemap is accessible
curl https://pulockdebroy.com/sitemap.xml

# Verify robots.txt is accessible
curl https://pulockdebroy.com/robots.txt
```

### 4. Google Search Console
- [ ] Submit sitemap: `https://pulockdebroy.com/sitemap.xml`
- [ ] Request indexing for homepage
- [ ] Monitor coverage reports
- [ ] Check mobile usability

### 5. Schema Validation
- Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
- Enter `https://pulockdebroy.com`
- Verify Person and WebSite schemas are recognized

### 6. Security Headers Verification
- Visit [Security Headers](https://securityheaders.com)
- Enter `https://pulockdebroy.com`
- Check all security headers are present
- Target: A+ grade

## Post-Deployment Verification

### Immediate (First Hour)
- [ ] Homepage loads without errors
- [ ] All navigation links work
- [ ] Contact form functions
- [ ] Mobile responsive design verified
- [ ] Images load properly

### Day 1 Checks
- [ ] Google Search Console shows no crawl errors
- [ ] Sitemap accepted (no errors in Search Console)
- [ ] Core Web Vitals look good
- [ ] No 404 errors in Google Search Console

### Week 1 Checks
- [ ] Google has indexed homepage
- [ ] Rich results showing in search (if applicable)
- [ ] No manual actions in Search Console
- [ ] Performance metrics stable

### Ongoing Monitoring
- Check Google Search Console weekly for first month
- Monitor Core Web Vitals monthly
- Review analytics for traffic and user behavior
- Check for broken links monthly

## Important Notes

### About the Domain Change
All URLs have been updated from `pulockdebroy.live` to `pulockdebroy.com`. If you have any external links pointing to the old domain, they will NOT automatically redirect. Set up redirects at your domain registrar if needed.

### Email Contact
All contact forms and references now use `pulock@ravenence.com`. Make sure this email address:
- Is monitored regularly
- Has proper forwarding set up if needed
- Is added to your email client

### LinkedIn Profile
The LinkedIn URL is set to: `https://www.linkedin.com/in/pulock-deb-roy-833584218`

Make sure this matches your actual LinkedIn profile URL.

## Rollback Instructions

If you need to rollback the deployment:

1. In Vercel dashboard, go to Deployments
2. Find the previous successful deployment
3. Click "Redeploy" on that deployment
4. Monitor new deployment
5. Update Google Search Console if issues occur

## Support & Maintenance

### Monthly Tasks
- Review Google Search Console for errors
- Check Core Web Vitals
- Update portfolio section with new projects
- Monitor analytics

### Quarterly Tasks
- Full SEO audit
- Security headers review (ensure HSTS is still active)
- Performance optimization review
- Content freshness check

### Annual Tasks
- Complete website audit
- Update all dependencies
- Review and update JSON-LD schema if information changes
- Backup important content

## Questions & Issues

### If homepage doesn't load
1. Check Vercel deployment status
2. Verify domain DNS settings
3. Check browser console for errors
4. Clear browser cache and try again

### If forms aren't working
1. Check database connection (if applicable)
2. Verify EmailJS configuration (if using)
3. Check API routes in Vercel logs
4. Monitor error logs

### If Search Console shows errors
1. Check robots.txt is valid
2. Verify canonical URLs are correct
3. Test URLs in Search Console's URL Inspection tool
4. Submit for recrawl if needed

---

**Last Updated:** July 13, 2026  
**Status:** Ready for Production Deployment
