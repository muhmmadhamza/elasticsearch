import { Client } from '@elastic/elasticsearch';

const endpointUrl = process.env.NEXT_PUBLIC_ES_URL;
const apiKey=process.env.API_KEY

export async function GET(req) {

  const client = new Client({ node: endpointUrl, auth: { apiKey: apiKey } });

  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  // source="Twitter"

  try {
    const heatmapResponse = await client.search({
      index: 'earthquake_datas',
      from:0,
      size: 20,
      body: {
        query: {
          term: {
            Keywords: {
              value: "Yes",
            
            }
          }

        }
      },
    });
    const city = await client.search({
      index: 'earthquake_datas',
      body: {
        query: {
          bool: {
            must: [
              {
                exists: {
                  field: "city"
                }
              },
              {
                exists: {
                  field: "location"
                }
              }
            ]
          }
        },
        _source: ["city", "location"]
      }
    });
    const earthquakeLocations = city.hits.hits.map(hit => ({
      city: hit._source.city,
      lat: hit._source.location.lat,
      lon: hit._source.location.lon
    }));
    
    console.log(earthquakeLocations);
 
    

    const heatmapData = heatmapResponse.hits.hits.map(hit => hit._source);
    const sentimentResponse = await client.search({
      index: 'earthquake_datas',
      body: {
        query:{
          bool:{
            must:{
                match:{
                 source:"Twitter"
                },
              }
            },
          
        },
        aggs: {
          sentiment_count: {
            terms: { field: 'predicted_sentiment_value' },
         
          },
        }
        
        ,
      },
    });

    let sentimentCounts = {
      positive: 0,
      negative: 0,
      neutral: 0,
    };

     sentimentResponse.aggregations.sentiment_count.buckets.forEach(bucket => {
      const sentiment = bucket.key.toLowerCase();
      if (sentiment === 'positive') {
        sentimentCounts.positive += bucket.doc_count;
      } else if (sentiment === 'negative') {
        sentimentCounts.negative += bucket.doc_count;
      } else if (sentiment === 'neutral') {
        sentimentCounts.neutral += bucket.doc_count;
      }
    });

     const donutData = [
      { sentiment: 'Positive', count: sentimentCounts.positive },
      { sentiment: 'Negative', count: sentimentCounts.negative },
      { sentiment: 'Neutral', count: sentimentCounts.neutral },
    ];

   
     return new Response(JSON.stringify({ heatmapData, donutData ,earthquakeLocations}), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...Object.fromEntries(headers) },
    });
  } catch (error) {
    console.error('Error fetching data from ElasticSearch:', error);
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...Object.fromEntries(headers) },
    });
  }
}
