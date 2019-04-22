using Microsoft.Extensions.Caching.Memory;
using System;

namespace DartsProject.Providers
{
	public static class GlobalCacheReader
	{
		public static MemoryCache Cache { get; set; }

		static GlobalCacheReader()
		{
			Cache = new MemoryCache(new MemoryCacheOptions() { });
		}

		public static class CacheKeys
		{
			public static string FileFolder { get { return "FileFolder"; } }
			public static string SqlConnectionString { get { return "SqlConnectionString"; } }
			public static string Amounts { get { return "Amounts"; } }
			public static string Regions { get { return "Regions"; } }
			public static string Terms { get { return "Terms"; } }
			public static string SysSettings { get { return "SysSettings"; } }
			public static string BPMLogin { get { return "BPMLogin"; } }
			public static string BPMCookie { get { return "BPMCookie"; } }
			public static string BPMPassword { get { return "BPMPassword"; } }
			public static string BPMUri { get { return "BPMUri"; } }
			public static string Cities { get { return "Cities"; } }
			public static string Divisions { get { return "Divisions"; } }
			public static string FileService { get { return "FileService"; } }
			public static string SmsService { get { return "SmsService"; } }
			public static string SmsUrl { get { return "SmsUrl"; } }
			public static string SmsLogin { get { return "SmsLogin"; } }
			public static string SmsPassword { get { return "SmsPassword"; } }
			public static string MainWorkerUri { get { return "MainWorkerUri"; } }
			public static string LedgerUri { get { return "LedgerUri"; } }
			public static string LedgerService { get { return "LedgerService"; } }
		}

		public static bool GetValue<T>(string key, out T value)
		{
			return Cache.TryGetValue(key, out value);
		}

		public static void SetValue<T>(string key, T value)
		{
			GlobalCacheReader.Cache.Set(key, value);
		}

		public static void SetTemporaryValue<T>(string key, T value, TimeSpan lifeTime)
		{
			GlobalCacheReader.Cache.Set(key, value, lifeTime);
		}
	}
}
